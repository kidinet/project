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
        
        public bool addUser(string mail,int groupId,bool type)
        {
            using (var db = new BloggingContext())
            {
                Users user = db.Users.FirstOrDefault(x => x.mail == mail);
                if (user == null)
                {
                    user = new Users(mail);
                    try
                    {
                        db.Users.Add(user);
                        db.SaveChanges();
                    }
                    catch (Exception ex) { throw ex; };
                }
                try
                {
                    db.UserInGroups.Add(new UserInGroup(groupId,mail,type));
                    db.SaveChanges();
                }
                catch (Exception ex) { throw ex; };

            }
            return true;
        }
        public bool addUser(
            int groupId,
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName,
            string nickName,
            string profile,
            string password,
            bool type,
            string city,
            string streat
            )
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    db.Users.Add(new Users(mail, firstName, lastName, childFirstName, childLastName, nickName, profile, password,city, streat));
                    db.UserInGroups.Add(new UserInGroup(groupId, mail,type));
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return true;
        }
        public Users[] getUser(string mail)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user= db.Users.Where(x => x.mail == mail).ToArray();
                    return user;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool updateUser(
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName,
            string nickName,
            string profile,
            string password,
            bool type,
            string city,
            string streat,
            int build)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user = db.Users.Where(x => x.mail == mail);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return true;
        }
        public Users createUser(
            string mail,
            string firstName,
            string lastName,
            string childFirstName,
            string childLastName,
            string nickName,
            string profile,
            string password,    
            string city,
            string streat,
            int build,
            string phone
            )
        {
            using (var db = new BloggingContext())
            {
                Users existentUser = new Users();
                existentUser = db.Users.FirstOrDefault(x => x.mail == mail);
                if (existentUser != null)
                {
                    db.UserInGroups.Add(new UserInGroup(1, mail, true));
                    return existentUser;
                }
                try
                {
                        Users user=new Users(mail,
                        firstName,
                        lastName,
                        childFirstName,
                        childLastName,
                        nickName,
                        profile,
                        password,
                        city,
                        streat,
                        build,
                        phone); 
                        db.Users.Add(user);
                        db.SaveChanges();
                        return user;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
    
}
