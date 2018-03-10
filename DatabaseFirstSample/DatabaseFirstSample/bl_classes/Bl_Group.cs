using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DatabaseFirstSample.bl_classes;
using System.IO;
using System.Net.Mail;
using System.Web;
using System.Web.Hosting;
using System.Runtime.Serialization;

namespace DatabaseFirstSample
{
    [Serializable]
    [DataContract]
    public class Bl_Group
    {
        public Bl_Group(Group group)
        {
            this.id = group.id;
            this.name = group.name;
            this.city = group.city;
            this.street = group.street;
            this.build = group.build;
            this.phone = group.phone;
            this.mail = group.mail;
            this.fax = group.fax;
            this.latitute = group.latitute;
            this.longitude = group.longitude;
        }

        public Bl_Group()
        {
        }

        [DataMember]
        public int id { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string street { get; set; }
        [DataMember]
        public Nullable<int> build { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string mail { get; set; }
        [DataMember]
        public string fax { get; set; }
        [DataMember]
        public Nullable<double> latitute { get; set; }
        [DataMember]
        public Nullable<double> longitude { get; set; }
        public Result<Bl_Group> createGroup(Group newGroup)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    //                   Group group = new Group(name, city, street, build, phone, mail, fax);
                    db.Groups.Add(newGroup);
                    db.SaveChanges();
                    return new Result<Bl_Group>(true, new Bl_Group(newGroup));

                }
                catch (Exception ex)
                {
                    return new Result<Bl_Group>(false, ex.Message);
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

        public Result<Bl_Group> createGroup(string name, string city, string street, int build, string phone, string mail, string fax)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    Group newGroup = new Group(name, city, street, build, phone, mail, fax);
                    db.Groups.Add(newGroup);
                    db.SaveChanges();
                    return new Result<Bl_Group>(true, new Bl_Group(newGroup));

                }
                catch (Exception ex)
                {
                    return new Result<Bl_Group>(false, ex.Message);
                    throw ex;
                }
            }
        }

        /// <summary>
        /// the function get subject,groupName,password and sand email to the prant to join him to kidinet group.
        /// the function use the other function PopulateBody to create html string for the email.
        /// in the email, the prent gets Temporary password, and has to change it.
        /// </summary>
        /// <param name="recepientEmail"></param>
        /// <param name="subject"></param>
        /// <param name="groupName"></param>
        /// <param name="password"></param>
        public bool SendEmail(User recepientEmail, string subject, string groupName, bool isNew)
        {
            {
                MailMessage mail = new MailMessage();
                SmtpClient client = new SmtpClient();
                mail.From = new MailAddress("kidinet.group@gmail.com", "kidinet");

                mail.Subject = subject;
                mail.IsBodyHtml = true;
                client.Port = 587;
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential("kidinet.group@gmail.com", "kidinet1234");
                
                {
                    MailAddress mailAdress = new MailAddress(recepientEmail.mail, "kidinet");
                    mail.To.Add(mailAdress);
                    if (isNew)
                        using (var db = new BloggingContext())
                        {
                            var password = db.Users.FirstOrDefault(x => x.mail == recepientEmail.mail).password_;
                            mail.Body = PopulateBody("groupName", "הסיסמא הזמנית שלכם:" + password);
                        }
                  
                    else
                        mail.Body = PopulateBody("groupName", "");
                    client.Send(mail);
                    mail.To.Remove(mailAdress);
                }

            }
            return true;
        }
        public string PopulateBody(string groupName, string password)
        {

            string body = string.Empty;
            using (StreamReader reader = new StreamReader(System.Web.Hosting.HostingEnvironment.MapPath("~/mailToParent.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{groupName}", groupName);
            body = body.Replace("{password}", password);
            return body;
        }

        public bool sendEmailToPrent(User userInGroup, int groupId, bool isNew)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    string groupName = db.Groups.FirstOrDefault(group => group.id == groupId).name;
                    return SendEmail(userInGroup, "kidinet ברוכים הבאים ל", groupName, isNew);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }
        public void addUserToGroup(User[] newUsers)
        {
            bool isNew = false;
            int groupId = newUsers[0].UserInGroups.ToArray()[0].groupId;
            using (var db = new BloggingContext())
            {
                foreach (User newUser in newUsers)
                {
                    if (db.Users.FirstOrDefault(user => user.password_ == newUser.password_) == null)
                    {
                        try
                        {
                            newUser.UserInGroups = null;
                            db.Users.Add(newUser);
                            db.SaveChanges();
                            isNew = true;
                            UserInGroup userInGroup = new UserInGroup() { userMail = newUser.mail, groupId = groupId,isAdministrator=false };
                            db.UserInGroups.Add(userInGroup);
                            db.SaveChanges();
                        }
                         catch(Exception e)
                        {
                            
                        }
                    }
                    
                    sendEmailToPrent(newUser, groupId, isNew);
                }
            }
        }
        public Result<Group> updateGroup(Group groupToUpate)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var group = db.Groups.Find(groupToUpate.id);
                    //   group.Select(g => g.name == groupName && g.city == groupCity && g.streat == groupStreet && g.build == groupBuild && g.mail == groupMail && g.fax == groupFax);
                    group.name = groupToUpate.name;
                    group.city = groupToUpate.city;
                    group.street = groupToUpate.street;
                    group.build = groupToUpate.build;
                    group.mail = groupToUpate.mail;
                    group.fax = groupToUpate.fax;
                    db.SaveChanges();
                    return new Result<Group>(true, (Group)group);
                }
                catch (Exception ex)
                {
                    return new Result<Group>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public Result<Group> deleteGroup(int groupId)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var group = db.Groups.Where(g => g.id == groupId);
                    db.Groups.Remove((Group)group);
                    db.SaveChanges();
                    return new Result<Group>(true, (Group)group);
                }
                catch (Exception ex)
                {
                    return new Result<Group>(false, ex.Message);
                    throw ex;
                }
            }
        }


        //public Dictionary<int, List<ResponseImage>> getResponseImages(int groupId, int startNum)
        //{
        //    Dictionary<int, List<ResponseImage>> groupImages = new Dictionary<int, List<ResponseImage>>();
        //    using (var db = new BloggingContext())
        //    {
        //        try
        //        {
        //            var images = db.ImageGalleries.Where(image => image.groupId == groupId);
        //            foreach (ImageGallery image in images)
        //            {
        //                groupImages.Add(image.id, new BL_IMAGE().getResponsesbyImageId(image.id));
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }
        //    return groupImages;
        //}

    }
}

