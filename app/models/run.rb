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

	def execute(hostname, username, password)
		self.output = "Starting console...\n\n"
		self.editable = false
		self.save!

		Thread.new do
			Net::SSH.start(hostname, username, password: password) do |ssh|
			  ssh.exec("export LD_LIBRARY_PATH=\"$LD_LIBRARY_PATH:/usr/local/cuda/lib64\";
			  			export CUDA_HOME=/usr/local/cuda;
			  			export PATH=$PATH:/usr/local/cuda-7.5/bin;
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

	  self.output.scan(/\[Checkpoint\] Checkpointed at Epoch (?<epoch>\d+), Minibatch (?<minibatch>\d+)./) do |epoch, minibatch|
	  	result << {epoch: epoch, minibatch: minibatch}
	  end

	  return result.last(5)
	end

  private
	def broadcast(channel, data)
      message = {:channel => channel, :data => data}
	  uri = URI.parse("http://localhost:9292/faye")
	  Net::HTTP.post_form(uri, :message => message.to_json)
	end
end
