class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t|
      t.references :research_project, null: false, foreign_key: true
      t.string :name
      t.float :value
      t.date :date
      t.text :notes

      t.timestamps
    end
  end
end
