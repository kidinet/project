using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DatabaseFirstSample.bl_classes;

namespace DatabaseFirstSample
{
    public class Bl_Group
    {

        public Result<Group> createGroup(string name, string city,string street, int build, string phone, string mail, string fax)
        {
            
            using (var db = new BloggingContext())
            {
                try
                {
                    Group group =new Group(name, city, street ,build, phone, mail, fax);
                    db.Groups.Add(group);
                    db.SaveChanges();
                    return new Result<Group>(true, group);
                     
                }
                catch (Exception ex)
                {
                    return new Result<Group>(false, 1);
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
