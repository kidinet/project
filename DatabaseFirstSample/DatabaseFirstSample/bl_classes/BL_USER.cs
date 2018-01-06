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
        
        public Users getUser(string mail)
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


        public Result<Users> createUser(
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
                Users existentUser = db.Users.FirstOrDefault(x => x.mail == mail);
                if (existentUser != null)
                {
                    return new Result<Users>(false, new Users(),1);
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
                        return new Result<Users>(true,user);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
    
}
