class RenameNotesToDescriptionInMetrics < ActiveRecord::Migration[7.1]
  def change
    rename_column :metrics, :notes, :description
  end
end
