# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  def self.guest
    find_or_create_by(email: "guest@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64
    end
  end
end
