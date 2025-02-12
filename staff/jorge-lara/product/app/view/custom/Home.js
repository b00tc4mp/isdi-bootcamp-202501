function Home() {
    Component.call(this, 'div');

    let logoHome = new Heading(1);
    logoHome.setText('Home');
    this.add(logoHome);

    let signOutButton = new Button();
    signOutButton.setText('Sign out');
    this.add(signOutButton);

    signOutButton.addClickListener(function (){
        try{
            logic.logoutUser();

            this.logoutClickListener();
        }catch (error){
            console.error(error);

            alert(error.message);
        }
    }.bind(this))

    let postContent = new Article();
    postContent.setOrientation('flex', 'column');
    postContent.container.style.width = '250px';
    this.add(postContent);

    let imgArray = ['https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg', 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=']
    imgArray.forEach(function (image) {
        let img = new Image();
        img.container.src = image;
        postContent.add(img);
    }.bind(this))
}
Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Home.prototype.addSignoutClickListener = function (listener) {
    this.logoutClickListener = listener;
}