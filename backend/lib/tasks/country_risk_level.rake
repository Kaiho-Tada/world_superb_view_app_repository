namespace :country_risk_level do
  desc "countryのrisk_levelを取得する"
  task get_country_risk_level: :environment do
    require 'open-uri'
    require 'nokogiri'

    Country.all.each do |country|
      url = "https://www.ezairyu.mofa.go.jp/opendata/country/#{country.code}.xml"
      xml = URI.open(url).read
      doc = Nokogiri::XML.parse(xml)
      set1 = doc.xpath('/opendata/riskLevel1')
      set2 = doc.xpath('/opendata/riskLevel2')
      set3 = doc.xpath('/opendata/riskLevel3')
      set4 = doc.xpath('/opendata/riskLevel4')
      if set4.text == "1"
        country.update(risk_level: 4)
      elsif set3.text == "1"
        country.update(risk_level: 3)
      elsif set2.text == "1"
        country.update(risk_level: 2)
      elsif set1.text == "1"
        country.update(risk_level: 1)
      else
        country.update(risk_level: 0)
      end
    end
  end
end
