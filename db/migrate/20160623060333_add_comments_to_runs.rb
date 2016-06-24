class AddCommentsToRuns < ActiveRecord::Migration
  def change
    add_column :runs, :comments, :text
  end
end
