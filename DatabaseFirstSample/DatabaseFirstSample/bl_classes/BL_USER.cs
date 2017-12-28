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
        
        public bool addUser(string mail,int groupId)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    db.Users.Add(new Users(mail, groupId));
                    db.SaveChanges();
                }
                catch(Exception ex)
                {
                    throw ex;
                }
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
                    db.Users.Add(new Users(groupId, mail, firstName, lastName, childFirstName, childLastName, nickName, profile, password, type, city, streat));
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
                    var user= db.Users.Where(x => x.mail == mail);
                    Console.WriteLine(user.ToList());
                    foreach (Users u in user)
                    {
                        u.firstName = firstName;
                        u.lastName = lastName;
                        u.childFirstName = childFirstName;
                        u.childLastName = childLastName;
                        u.nickname = nickName;
                        u.profile_ = profile;
                        u.password_ = password;
                        u.type_ = type;
                        u.city = city;
                        u.streat = streat;
                        u.build = build;

                        db.Users.Attach(u);
                        db.Entry(u).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return true;
        }
    }
}
