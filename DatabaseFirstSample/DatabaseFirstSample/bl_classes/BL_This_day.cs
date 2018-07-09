using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using DatabaseFirstSample.bl_classes;

namespace DatabaseFirstSample
{
    public class BL_THIS_DAY
    {
        public List<ThisDayOfGroup> getCurrentGroupThisDayTitles(int GroupId)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    return db.ThisDayOfGroups.Where(title => title.groupId == GroupId).ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public List<Dictionary<string, Object>> getDisplayDayParam(int GroupId, DateTime date)
        {

            List<Dictionary<string, Object>> thisDay = new List<Dictionary<string, Object>>();
            using (var db = new BloggingContext())
            {
                try
                {
                    var titleForGroup = db.ThisDayOfGroups.Where(title => title.groupId == GroupId).ToList();
                    foreach (ThisDayOfGroup groupTitle in titleForGroup)
                    {
                        Dictionary<string, Object> thisDayInfo = new Dictionary<string, object>();
                        var thisDayContent = db.ThisDayContents.FirstOrDefault(x => x.titleId == groupTitle.id && x.date == date);
                        thisDayInfo.Add("title", groupTitle);
                        thisDayInfo.Add("content", thisDayContent);
                        thisDay.Add(thisDayInfo);
                    }
                    return thisDay;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public Result<ThisDayContent> updateThisDayTitle(ThisDayContent thisDayContent)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var content = db.ThisDayContents.FirstOrDefault(thisContent => thisContent.titleId == thisDayContent.titleId);
                    content.content = thisDayContent.content;
                    content.date = content.date;
                    db.SaveChanges();
                    return new Result<ThisDayContent>(true, (ThisDayContent)content);
                }
                catch (Exception ex)
                {
                    return new Result<ThisDayContent>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public Result<ThisDayOfGroup> updateThisDayOfGroupTitle(ThisDayOfGroup thisDayOfGroup)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    var title = db.ThisDayOfGroups.Find(thisDayOfGroup.id);
                    title.groupId = thisDayOfGroup.groupId;
                    title.icon = thisDayOfGroup.icon;
                    title.title = thisDayOfGroup.title;
                    title.color = thisDayOfGroup.color;//Should change the contetnt too
                    db.SaveChanges();
                    return new Result<ThisDayOfGroup>(true, (ThisDayOfGroup)title);
                }
                catch (Exception ex)
                {
                    return new Result<ThisDayOfGroup>(false, ex.Message);
                    throw ex;
                }
            }
        }
        public Result<ThisDayOfGroup> addThisDayOfGroupTitle(ThisDayOfGroup thisDayOfGroup)
        {
            using (var db = new BloggingContext())
            {
                try
                {
                    db.ThisDayOfGroups.Add(thisDayOfGroup);
                    db.SaveChanges();
                    return new Result<ThisDayOfGroup>(true, (ThisDayOfGroup)thisDayOfGroup);
                }
                catch (Exception ex)
                {
                    return new Result<ThisDayOfGroup>(false, ex.Message);
                    throw ex;
                }
            }
        }
    }
}

