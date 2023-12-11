class Schedule < ApplicationRecord
  belongs_to :user

  validates :title, :start_date, presence: true

  enum color: { blue: 0, red: 1, yellow: 2, green: 3, pink: 4, orange: 5, purple: 6, gray: 7 }
end
