                                            Friends Media Album




https://user-images.githubusercontent.com/109414918/235289604-ef2cb34b-7d10-41bd-b3ef-0daad53ddcd6.mp4




             This is amedia album log for all your friends to store thier images in an album system

      This project was set up with the help of React --- JSON server(Manually created) --- Redux. Here the server is started
      up and the app is run. It fetches the data of existing friends from the JSON server. Wecan click and add new friends
      also add images for them.

Two techniques used to interact with Redux store
           i) Redux Thunk -- for adding friends
           ii) Redux Toolkit Query --> for adding albums and images


file structure in src is divided into following parts
i) components --> contains all thefunctional itemslike
                            a) button
                            b) expandable menu
                            c) AlbumList
                            d) AlbumList Item
                            e) Panel
                            f) PhotoList
                            g) PhotoListItem
                            h) Skeleton
                            i) UserList
                            j) UserListItem
ii) hooks --> just one for thunk
                            a) use-Thunk
iii) Redux part 
            a) API --> api for albums and photos
                 1) AlbumAPI
                 2) PhotoAPI
            b) Slice
                 1) usersSlice
            c) thunk
                 1) addUser
                 2) fetchUser
                 3) removeUser

iv) db.json --> the actual API strucuture file

