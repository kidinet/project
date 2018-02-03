using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DatabaseFirstSample
{
    public class BL_USER
    {
        public BL_USER() { }
        
        public bool addUser()
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var user = new Users { firstName = "Rachel" };
                    db.Users.Add(user);
                    db.SaveChanges();
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
            return true;
        }
        public Users getUser()
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    Users b =new Users();
                    b= db.Users.FirstOrDefault(x => x.firstName == "Rachel");
                    return b;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
