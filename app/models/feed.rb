class Feed < ActiveRecord::Base
  has_many :entries
end
