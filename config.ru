require 'sinatra'

# dont run the builtin server
set :run, false

# propagate errors for easier debugging
set :raise_errors, true

run Sinatra::Application
