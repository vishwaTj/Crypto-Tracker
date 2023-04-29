                                            Crupto Tracker Application








             This is a live Crypto Tracker Application which give info on crypto currencies in different currencies

      This project was set up with the help of React and data was pulled from a live api which gives values of all crypto coins

Unique Technique used  --> A graph plot was implemented for all coins helps users to understand the coins performance before investing
The graph can be varied between 24-hour,monthly and yealry format.

React Chart was used to plot the live graaph

Matrial UI was used to set up different components in the application


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

