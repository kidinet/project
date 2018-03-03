using DatabaseFirstSample.bl_classes;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseFirstSample
{
    public class BL_User
    {
        public BL_User() { }

        public User getUser(string mail)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var User = db.Users.FirstOrDefault(x => x.mail == mail);
                    return User;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        //string mail,
        //string firstName,
        //string lastName,
        //string childFirstName,
        //string childLastName,
        //string nickName,
        //byte[] profile,
        //string password,
        //string city,
        //string streat,
        //int build,
        //bool isAdiministrator,
        //int groupId
        public Result<User> createUser(User newUser, UserInGroup newUserInGroup)
        {
            byte[] profile_;
            string varFilePath = "D:/Users/Gili/Pictures/aaa/vvv.jpg";
            using (var stream = new FileStream(varFilePath, FileMode.Open, FileAccess.Read))
            {
                using (var reader = new BinaryReader(stream))
                {
                    profile_ = reader.ReadBytes((int)stream.Length);
                }
            }

            using (var db = new BloggingContext())
            {

                string varPathToNewLocation = @"C:/pictures/aczcaa.jpg";
                byte[] blob = db.Users.FirstOrDefault(x => x.mail == "ghjghj@kytujkjk3333j.com").profile_;
                using (var fs = new FileStream(varPathToNewLocation, FileMode.Create, FileAccess.Write))
                    fs.Write(blob, 0, blob.Length);
                User existentUser = db.Users.FirstOrDefault(x => x.mail == newUser.mail);
                if (existentUser != null)
                {
                    return new Result<User>(false, new User(), "");
                }
                try
                {
                    db.Users.Add(newUser);
                    db.UserInGroups.Add(newUserInGroup);
                    db.SaveChanges();
                    return new Result<User>(true, newUser);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public Result<User> updateUser(User userToUpdate)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user = db.Users.Find(userToUpdate.mail);
                    user.firstName = userToUpdate.firstName;
                    user.lastName = userToUpdate.lastName;
                    user.city = user.city;
                    user.streat = userToUpdate.streat;
                    user.build = userToUpdate.build;
                    db.SaveChanges();
                    return new Result<User>(true, (User)user);
                }
                catch (Exception ex)
                {
                    return new Result<User>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public Result<UserInGroup> updateUserIngroup(UserInGroup userInGroupToUpdate)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    UserInGroup userInGroup = db.UserInGroups.FirstOrDefault(u => u.userMail == userInGroupToUpdate.userMail);
                    userInGroup.groupId = userInGroupToUpdate.groupId;
                    userInGroup.childFirstName = userInGroupToUpdate.childFirstName;
                    userInGroup.childLastName = userInGroupToUpdate.childLastName;
                    userInGroup.nickname = userInGroupToUpdate.nickname;
                    db.SaveChanges();
                    return new Result<UserInGroup>(true, userInGroup);

                }
                catch (Exception ex)
                {
                    return new Result<UserInGroup>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public Result<User> updateProfileImage(string mail, byte[] profile)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user = db.Users.FirstOrDefault(u => u.mail == mail);
                    user.profile_ = profile;
                    db.SaveChanges();
                    return new Result<User>(true, (User)user);
                }
                catch (Exception ex)
                {
                    return new Result<User>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public Result<User> deleteUser(string mail)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user = db.Users.Where(u => u.mail == mail);
                    db.Users.Remove((User)user);
                    db.SaveChanges();
                    return new Result<User>(true, (User)user);
                }
                catch (Exception ex)
                {
                    return new Result<User>(false, ex.Message);
                    throw ex;
                }
            }
        }

    }


}

