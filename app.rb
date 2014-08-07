require 'sinatra'

get '/' do
  erb :index
end

# liek awildcard for individual erbs
get '/:page' do
  erb "#{params[:page]}".to_sym
end