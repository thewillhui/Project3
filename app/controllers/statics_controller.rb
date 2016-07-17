class StaticsController < ApplicationController
  before_action :authenticate_user!, only: [ :secret]
  before_action :authenticate, only: [ :searchbox]

  def home
  end

  def secret
  end

  def searchbox
  end


end