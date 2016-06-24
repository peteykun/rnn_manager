class CreateRuns < ActiveRecord::Migration
  def change
    create_table :runs do |t|
      t.string :task_name
      t.integer :batch_size
      t.integer :embedding_dim
      t.integer :memory_dim
      t.integer :num_layers
      t.integer :epochs
      t.integer :resume_at
      t.integer :resume_epoch
      t.integer :resume_training_minibatch
      t.string :rnn_cell
      t.integer :ckpt_every
      t.boolean :correct_pairs
      t.boolean :mux_network
      t.text :output

      t.timestamps null: false
    end
  end
end
