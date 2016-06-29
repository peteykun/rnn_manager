class Run < ActiveRecord::Base
	def self.human_attribute_name(*args)
	  	if args[0].to_s == "id"
	    	return '#'
	  	elsif args[0].to_s == "embedding_dim"
	  		return 'Embedding dimension'
	  	elsif args[0].to_s == "memory_dim"
	  		return 'Memory'
	  	elsif args[0].to_s == "num_layers"
	  		return 'Layers'
	  	elsif args[0].to_s == "rnn_cell"
	  		return 'Cell Type'
	  	elsif args[0].to_s == "ckpt_every"
	  		return 'Checkpoint Every'
	  	elsif args[0].to_s == "correct_pairs"
	  		return 'Correct pairs'
	  	elsif args[0].to_s == "mux_network"
	  		return 'MUX network'
	  	end

	  	super
	end

	def execute(hostname, username, password, reset_console=true)
		if reset_console
			self.output = "Starting console...\n\n"
		else
			self.output += "\n\nStarting console...\n\n"
		end

		self.editable = false
		self.save!

		Thread.new do
			Net::SSH.start(hostname, username, password: password) do |ssh|
			  ssh.exec("export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/lib64;
			  			export PATH=$PATH:/usr/local/cuda/bin;
			  			export CUDA_HOME=/usr/local/cuda;
			  			cd ~/client;
			  			source ~/env/bin/activate;
			  			python seq2seq-attention.py #{self.arguments}") do |ch, stream, data|
			    self.output = self.output + data
			    self.save!

			    broadcast("/messages/#{id.to_s}", self.output)
			  end

			  ssh.loop
			end
		end
	end

	def resume(hostname, username, password, step)
		resume_checkpoint = nil

		self.checkpoints.each do |checkpoint|
			if checkpoint[:step] == step.to_i
				resume_checkpoint = checkpoint
			end
		end

		self.resume_at = resume_checkpoint[:step]
		self.resume_epoch = resume_checkpoint[:epoch]
		self.resume_training_minibatch = resume_checkpoint[:minibatch]
		self.save!

		self.execute(hostname, username, password, false)
	end

	def arguments
		args = []

		args << self.task_name
		args << self.batch_size
		args << self.embedding_dim
		args << self.memory_dim
		args << self.num_layers
		args << self.epochs
		args << self.resume_at
		args << self.resume_epoch
		args << self.resume_training_minibatch
		args << self.rnn_cell
		args << self.ckpt_every

		args << '--correct_pairs' if self.correct_pairs
		args << '--mux_network'   if self.mux_network

		return args.join(' ')
	end

	def stats
		result = Hash.new

		result[:training] = []
		result[:validation] = []
		result[:test] = []

		self.output.scan(/\[Training\] Loss: (?<loss>\d+[.]\d+)/) do |loss|
			result[:training] << {loss: loss[0].to_f}
		end

		self.output.scan(/\[Validation\] Loss: (?<loss>(\d*[.])?\d+) Token: (?<token>(\d*[.])?\d+) Localization: (?<localization>(\d*[.])?\d+) Repair: (?<repair>(\d*[.])?\d+)/) do |loss, token, localization, repair|
			result[:validation] << {loss: loss.to_f, token: token.to_f, localization: localization.to_f, repair: repair.to_f}
		end

		self.output.scan(/\[Test\] Loss: (?<loss>(\d*[.])?\d+) Token: (?<token>(\d*[.])?\d+) Localization: (?<localization>(\d*[.])?\d+) Repair: (?<repair>(\d*[.])?\d+)/) do |loss, token, localization, repair|
			result[:test] << {loss: loss.to_f, token: token.to_f, localization: localization.to_f, repair: repair.to_f}
		end

		return result
	end

	def checkpoints
	  result = []

	  self.output.scan(/Step: (?<step>\d+)\tEpoch: (\d*[.])?\d+\tLoss: (\d*[.])?\d+\n\[Checkpoint\] Checkpointed at Epoch (?<epoch>\d+), Minibatch (?<minibatch>\d+)./) do |step, epoch, minibatch|
	  	result << {step: step.to_i, epoch: epoch.to_i, minibatch: minibatch.to_i}
	  end

	  return result.last(5)
	end

  private
	def broadcast(channel, data)
          message = {:channel => channel, :data => data}
	  uri = URI.parse("http://10.192.31.20:9292/faye")
	  Net::HTTP.post_form(uri, :message => message.to_json)
	end
end
