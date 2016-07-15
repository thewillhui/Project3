class StaticsController < ApplicationController
  before_action :authenicate_user!, only: [ :secret]
  def home
  end

  def secret
  end
end
