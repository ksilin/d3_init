require 'sinatra'

# like a wildcard for individual erbs
# use: localhost:9292/10_some_example
get '/:template' do |template|
  @title = template
  erb template.to_sym
end

get '/' do
  @title = 'index'
  erb :index
end