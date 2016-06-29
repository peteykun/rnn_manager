Thread.new do
  system("rackup faye.ru -s thin -E production -o 10.192.31.20")
end
