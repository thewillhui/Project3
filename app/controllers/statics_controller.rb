class StaticsController < ApplicationController
  before_action :authenticate_user!, only: [ :secret]
  def home
  end

  def secret
  end

  def searchbox
  end
end
