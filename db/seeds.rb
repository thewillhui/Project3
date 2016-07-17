# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

url = ['http://www.economist.com/sections/international/rss.xml',
        'https://www.theguardian.com/world/rss']
        feed = Feedjira::Feed.fetch_and_parse url[0]
feed_info = {
  title: feed.title,
  url: "http://www.economist.com/sections/international/rss.xml"
}
newFeed = Feed.create(feed_info)