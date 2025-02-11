function Home() {
    Component.call(this, 'div')
    var logo = new Heading(1)
    this.add(logo)

    logo.setText('Logo')

    var containerTop = new Span()
    containerTop.container.style.display = 'flex'
    containerTop.container.style.marginTop = '30px'
    containerTop.container.style.justifyContent = 'space-between'
    this.add(containerTop)

    var greeting = new Heading(3)
    greeting.setText('Hello User!')
    containerTop.add(greeting)

    var exitButton = new Button()
    containerTop.add(exitButton)
    exitButton.setText('Exit')
    this.exitButton = exitButton


    var post1 = new Post('username1', 'https://imgs.search.brave.com/gLe1nNepyk97sd_4fBikHFr8rWHTdPIChvqye9jikaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc1/MjU4NDEyL2VzL2Zv/dG8vYm9zcXVlLWRl/LXNlY3VveWFzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/NXZqRjRkSWhnVkdo/aXFUMFhmV2Z0MUVa/SFU1X1hwZnJndTky/QUk5SWFjPQ', '6 hour ago')
    this.add(post1)

    var post2 = new Post('username2', 'https://imgs.search.brave.com/Cnh02OiyfEeEPUHV_Tc2KU6AN48vRUngZI01EopI4XE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmV2aXN0YW94aWdl/bm8uZXMvdXBsb2Fk/cy9zMS85Ni85Ny84/Ny8zL3J1dGFzLWNv/bi10b2RvLWVsLWVz/cGxlbmRvci1kZWwt/b3Rvbm8tZW4tbGEt/cHJvdmluY2lhLWRl/LWxlb24uanBlZw', '3 days ago')
    this.add(post2)

    var post3 = new Post('username3', 'https://imgs.search.brave.com/2T65C8AIVGMdeWWfmDLdz3T-jDOaI_iqKbmnBnw3zXs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/MzQyNTA4Ni9lcy9m/b3RvL3NlbmRlcm8t/bSVDMyVBMWdpY28t/ZGVsLWJvc3F1ZS15/LXQlQzMlQkFuZWwt/ZGUtJUMzJUExcmJv/bGVzLWFsLWFtYW5l/Y2VyLWVuLXByaW1h/dmVyYS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TFE5R1VX/MTctclV2dkhKampn/eGZ2VS1yMlZ2UDJl/eFRyT21kcFNFQlA4/Zz0', '2 weeks ago')
    this.add(post3)

    var post4 = new Post('username4', 'https://imgs.search.brave.com/U4-w0Zr88dLLLn8MpUKZX5VMd36FmA8leGiN0nwKuIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/ODEwODQ0L2VzL2Zv/dG8vbHV6LWEtdHJh/diVDMyVBOXMtZGUt/Ym9zcXVlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12RDZi/TzFILU9YWEp3WWRO/c2xEYXB4TzNhZkJk/MzJLRkVQUnpXeC1Y/ZUVvPQ', '1 month ago')
    this.add(post4)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.addExitClickListener = function (listener) {
    this.exitButton.addClickListener(listener)
}