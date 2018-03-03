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
namespace DatabaseFirstSample
{
    public class Bl_Group
    {

        public Result<Group> createGroup(Group newGroup)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    //                   Group group = new Group(name, city, street, build, phone, mail, fax);
                    db.Groups.Add(newGroup);
                    db.SaveChanges();
                    return new Result<Group>(true, newGroup);

                }
                catch (Exception ex)
                {
                    return new Result<Group>(false, ex.Message);
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
        /// <summary>
        /// the function get subject,groupName,password and sand email to the prant to join him to kidinet group.
        /// the function use the other function PopulateBody to create html string for the email.
        /// in the email, the prent gets Temporary password, and has to change it.
        /// </summary>
        /// <param name="recepientEmail"></param>
        /// <param name="subject"></param>
        /// <param name="groupName"></param>
        /// <param name="password"></param>
        public bool SendEmail(UserInGroup recepientEmail, string subject, string groupName, bool isNew)
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
                //                foreach (UserInGroup recepientEmail in recepientEmails)
                {
                    MailAddress mailAdress = new MailAddress(recepientEmail.userMail, "kidinet");
                    mail.To.Add(mailAdress);
                    if (isNew)
                        mail.Body = this.PopulateBody(groupName, "הסיסמא הזמנית שלכם:" + recepientEmail.User.password_);
                    else
                        mail.Body = this.PopulateBody(groupName, "");
                    client.Send(mail);
                    mail.To.Remove(mailAdress);
                }

            }
            return true;
        }
        public string PopulateBody(string groupName, string password)
        {

            string body = string.Empty;
            using (StreamReader reader = new StreamReader(System.Web.Hosting.HostingEnvironment.MapPath("~/mailToPrent.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{groupName}", groupName);
            body = body.Replace("{password}", password);
            return body;
        }

        public bool sendEmailToPrent(UserInGroup userInGroup, int groupId, bool isNew)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    //var recepientEmails = db.UserInGroups.Where(user => user.groupId == groupId).ToList();
                    string groupName = db.Groups.FirstOrDefault(group => group.id == groupId).name;
                    return SendEmail(userInGroup, "kidinet ברוכים הבאים ל", groupName, isNew);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }
        public void addUserToGroup(int groupId, List<User> newUsers)
        {
            bool isNew = false;
            using (var db = new BloggingContext())
            {

                foreach (User newUser in newUsers)
                {
                    if (db.Users.FirstOrDefault(user => user.password_ == newUser.password_) == null)
                    {
                        db.Users.Add(newUser);
                        isNew = true;
                    }
                    UserInGroup userInGroup = new UserInGroup() { userMail = newUser.mail, groupId = groupId };
                    db.UserInGroups.Add(userInGroup);
                    sendEmailToPrent(userInGroup, groupId, isNew);
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
                    group.streat = groupToUpate.streat;
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

