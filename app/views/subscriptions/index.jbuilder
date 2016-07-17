json.title @feed.title
json.entries do
  json.array! @feed.entries do |entry|
    json.title entry.title
    json.summary entry.summary
    json.url entry.url
    json.entry_id entry.entry_id
    json.published entry.published
  end
end