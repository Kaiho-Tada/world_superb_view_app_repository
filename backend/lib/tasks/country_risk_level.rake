namespace :country_risk_level do
  desc "countryのrisk_levelを取得する"
  task get_country_risk_level: :environment do
    require 'open-uri'
    require 'nokogiri'

    def fetch_risk_level(url)
      xml = URI.open(url).read
      doc = Nokogiri::XML.parse(xml)
      (1..4).each do |i|
        set = doc.xpath("/opendata/riskLevel#{i}")
        return i if set.text == "1"
      end
      0
    end
    Country.all.each do |country|
      url = "https://www.ezairyu.mofa.go.jp/opendata/country/#{country.code}.xml"
      risk_level = fetch_risk_level(url)
      country.update!(risk_level: risk_level)
    end
  end
end
