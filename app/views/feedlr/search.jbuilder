json.key @feeds.hint
json.results do
  json.array! @feeds.results do |result|
    json.title result.title
    json.visualUrl result.visualUrl
    json.feedId result.feedId
    json.website result.website
    json.description result.description
  end
end