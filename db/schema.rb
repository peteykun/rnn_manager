# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160623060333) do

  create_table "runs", force: :cascade do |t|
    t.string   "task_name"
    t.integer  "batch_size"
    t.integer  "embedding_dim"
    t.integer  "memory_dim"
    t.integer  "num_layers"
    t.integer  "epochs"
    t.integer  "resume_at"
    t.integer  "resume_epoch"
    t.integer  "resume_training_minibatch"
    t.string   "rnn_cell"
    t.integer  "ckpt_every"
    t.boolean  "correct_pairs"
    t.boolean  "mux_network"
    t.text     "output"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.boolean  "editable"
    t.text     "comments"
  end

end
