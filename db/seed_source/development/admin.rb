puts "create admin"

User.create!(
  name: "admin",
  email: "admin@admin.com",
  password: "aA12345678",
  password_confirmation: "aA12345678",
)

puts "end"