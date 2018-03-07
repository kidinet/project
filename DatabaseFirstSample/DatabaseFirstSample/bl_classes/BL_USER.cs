using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseFirstSample.bl_classes
{

    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.SqlClient;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Threading.Tasks;
    using bl_classes;
    using Newtonsoft.Json.Linq;
    using static BloggingContext;

    [Serializable]
    [DataContract]
    public class BL_User
    {
        public BL_User(User user)
        {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.build = user.build;
            this.latitute = user.latitute;
            this.longitude = user.longitude;
            this.profile_ = user.profile_;
            this.mail = user.mail;
            this.city = user.city;
            this.streat = user.streat;
            this.password_ = user.password_;
        }
        public BL_User()
        {
        }

        [DataMember]
        public string firstName { get; set; }
        [DataMember]
        public string lastName { get; set; }
        [DataMember]
        public byte[] profile_ { get; set; }
        [DataMember]
        public string mail { get; set; }
        [DataMember]
        public string password_ { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string streat { get; set; }
        [DataMember]
        public Nullable<int> build { get; set; }
        [DataMember]
        public Nullable<double> latitute { get; set; }
        [DataMember]
        public Nullable<double> longitude { get; set; }

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
        public Result<Object> deleteUser(string mail)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user = db.Users.Where(u => u.mail == mail);
                    db.Users.Remove((User)user);
                    db.SaveChanges();
                    var result = new { Username = "my name", Password = "the password" };
                    return new Result<Object>(true, result);
                }
                catch (Exception ex)
                {
                    return new Result<Object>(false, ex.Message);
                    throw ex;
                }
            }
        }

        public Result<JObject> logIn(User user)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    Bl_UserInGroup usersInGroup = new Bl_UserInGroup();
                    User user_ = db.Users.FirstOrDefault(u => u.mail == user.mail && u.password_ == user.password_);
                    if (user_ != null)
                    {
                        JObject api = new JObject();
                        api.Add("user", JToken.FromObject(new BL_User(user_)));
                        if (user_.UserInGroups.ToArray().Length == 1)
                        {
                            var usersInGroup_ = usersInGroup.getUsersInGroup(user_.UserInGroups.ToArray()[0].Group.UserInGroups.ToArray()).ToList();
                            api.Add("usersInGroup", JToken.FromObject(usersInGroup));
                            api.Add("currentUserInGroup", JToken.FromObject(new Bl_UserInGroup(user_.UserInGroups.ToArray()[0])));
                            api.Add("group", JToken.FromObject(new Bl_Group(user_.UserInGroups.ToArray()[0].Group)));
                            return new Result<JObject>(true, api);
                        }
                        var groups = usersInGroup.getUsersInGroupDictionary(user_.UserInGroups.ToArray()).ToList();
                        api.Add("groups", JToken.FromObject(groups));
                        return new Result<JObject>(true, api);
                    }

                }
                catch (Exception ex)
                {
                    return new Result<JObject>(false, ex.Message);
                    throw ex;
                }
            }
            return new Result<JObject>(false, "not found");
        }
        public Result<JObject> logIn(UserInGroup userInGroup)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    Bl_UserInGroup bl_usersInGroup_ = new Bl_UserInGroup();
                    UserInGroup user_ = db.UserInGroups.FirstOrDefault(u => u.userMail == userInGroup.userMail && u.User.password_ == userInGroup.User.password_ && u.groupId == userInGroup.groupId);
                    if (user_ != null)
                    {
                        JObject api = new JObject();
                        api.Add("user", JToken.FromObject(new BL_User(user_.User)));
                        var usersInGroup_ = bl_usersInGroup_.getUsersInGroup(user_.Group.UserInGroups.ToArray()).ToList();
                        var usersInCurrentGroupDetails = bl_usersInGroup_.getUsersInGroupDetails(user_.Group.UserInGroups.ToArray()).ToList();
                        api.Add("usersInGroup", JToken.FromObject(usersInGroup_));
                        api.Add("currentUserInGroup", JToken.FromObject(new Bl_UserInGroup(user_)));
                        api.Add("group", JToken.FromObject(new Bl_Group(user_.Group)));
                        api.Add("usersInCurrentGroupDetails", JToken.FromObject(usersInCurrentGroupDetails));
                        return new Result<JObject>(true, api);
                    }

                }
                catch (Exception ex)
                {
                    return new Result<JObject>(false, ex.Message);
                    throw ex;
                }
            }
            return new Result<JObject>(false, "not found");
        }
    }
}

