rm -rf ./build;
yarn build;
cp ./CNAME ./build/;
echo '<h1>Hello, catch all</h1>' > ./build/200.html;
surge ./build