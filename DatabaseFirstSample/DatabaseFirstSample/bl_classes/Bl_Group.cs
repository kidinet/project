using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseFirstSample
{
    public class Bl_Group
    {

        public Boolean createGroup(string name, string city, int build, string phone, string mail, string fax)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    db.Groups.Add(new Group(name, city, build, phone, mail, fax));
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return true;
        }
        public int getManegarGroupId(string mail)
        {
            using (var db = new BloggingContext())
            {
                return int.Parse(db.Users.FirstOrDefault(x => x.mail == mail && x.type_ == true).groupId.ToString());
            }
        }
    }
}
