using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseFirstSample
{
    public class Bl_Group
    {

        public Group createGroup(string name, string city, int build, string phone, string mail, string fax)
        {
            
            using (var db = new BloggingContext())
            {
                try
                {
                    Group group =new Group(name, city, build, phone, mail, fax);
                    db.Groups.Add(group);
                    db.SaveChanges();
                    return group;
                     
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public int getManegarGroupId(string mail)
        {
            using (var db = new BloggingContext())
            {
                UserInGroup user = db.UserInGroups.FirstOrDefault(x => x.userMail == mail);
                if (user != null)
                    return user.groupId;
                return -1;
            }
        }
    }
}
