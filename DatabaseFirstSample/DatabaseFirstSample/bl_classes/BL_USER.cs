using DatabaseFirstSample.bl_classes;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseFirstSample
{
    public class BL_USER
    {
        public BL_USER() { }
        
        public User getUser(string mail)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user= db.Users.FirstOrDefault(x => x.mail == mail);
                    return user;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }


        public Result<User> createUser(
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName
            // string nickName
            //string profile,
            //string password,
            //string city,
            //string streat,
            //int build,
            //string phone,
            //bool type,
            //int groupId
            )
        {
            using (var db = new BloggingContext())
            {
                User existentUser = db.Users.FirstOrDefault(x => x.mail == mail);
                if (existentUser != null)
                {
                    return new Result<User>(false, new User(),1);
                }
                try
                {
                    User user = new User(mail,
                    firstName,
                    lastName,
                    childFirstName,
                    childLastName);
                   // nickName);
                        //profile,
                        //password,
                        //city,
                        //streat,
                        //build,
                        //phone); 
                        db.Users.Add(user);
                        //db.UserInGroups.Add(new UserInGroup(groupId, mail, type));
                        db.SaveChanges();
                        return new Result<User>(true,user);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
    
}
