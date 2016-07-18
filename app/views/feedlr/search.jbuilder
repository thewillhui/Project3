json.title @feeds.queryType
json.feeds do
  json.array! @feeds.results do |result|
    json.title result.title
    json.logo result.visualUrl
    json.feedId result.feedId
    json.website result.website
    json.description result.description
  end
end