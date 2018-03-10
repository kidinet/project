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
using Newtonsoft.Json.Linq;

namespace DatabaseFirstSample
{
    [Serializable]
    [DataContract]
  
    public class Bl_About
    {
        [DataMember]
        public int id { get; set; }
        [DataMember]
        public string title { get; set; }
        [DataMember]
        public string icon { get; set; }
        [DataMember]
        public string color { get; set; }
        [DataMember]
        public int groupId { get; set; }
        [DataMember]
        public string content { get; set; }

        public Bl_About(about about)
        {
            this.id = about.id;
            this.title = about.title;
            this.icon = about.icon;
            this.color = about.color;
            this.groupId = about.groupId;
            this.content = about.content;
        }

        public List<Bl_About> getAboutTitles(List<about> aboutList)
        {
            List<Bl_About> aboutTitleList = new List<Bl_About>();
            foreach (about item in aboutList)
            {
                aboutTitleList.Add(new Bl_About(item));
            }
            return aboutTitleList;
        }
        public Bl_About()
        {
        }

        public Result<JObject> initAllAboutTitels(int groupId)
        {
            try
            {
                using (var db = new BloggingContext())
                {
                    JObject api = new JObject();
                    api.Add("aboutTitles", JToken.FromObject(getAboutTitles(db.abouts.Where(title => title.groupId == groupId).ToList())));
                    return new Result<JObject>(true, api);
                }
            }
            catch (Exception e)
            {
                return new Result<JObject>(false, e.Message);
            }

        }
        public Result<Bl_About> addAboutTitle(about newAboutTitle)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    db.abouts.Add(newAboutTitle);
                    db.SaveChanges();
                    return new Result<Bl_About>(true, new Bl_About(newAboutTitle));
                }
                catch (Exception ex)
                {
                    return new Result<Bl_About>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public void updateAboutTitle(about aboutTitle)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var title = db.abouts.FirstOrDefault(x => x.id == aboutTitle.id);
                    title.title = aboutTitle.title;
                    title.content = aboutTitle.content;
                    title.icon = aboutTitle.icon;
                    title.color = aboutTitle.color;
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public object initImagesForGallery(int groupId, int start)
        {
            throw new NotImplementedException();
        }

        public Result<about> deleteAboutTitle(int id)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var aboutTitle = db.abouts.FirstOrDefault(about => about.id == id);
                    db.abouts.Remove((about)aboutTitle);
                    db.SaveChanges();
                    return new Result<about>(true);
                }
                catch (Exception ex)
                {
                    return new Result<about>(false, ex.Message);
                    throw ex;
                }

            }
        }
    }
}

