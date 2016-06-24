class AddEditableToRuns < ActiveRecord::Migration
  def change
    add_column :runs, :editable, :boolean
  end
end
