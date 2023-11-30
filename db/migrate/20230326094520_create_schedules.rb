class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.string :title, null: false
      t.text :description
      t.date :start_date, null: false
      t.date :end_date
      t.time :start_time
      t.time :end_time
      t.boolean :is_all_day, null: false, default: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
