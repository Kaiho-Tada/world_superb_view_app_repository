require "rails_helper"

RSpec.describe 'country_risk_level:get_country_risk_level' do
  it "国ごとのリスクレベルが正しく設定されること" do
    task = Rake.application['country_risk_level:get_country_risk_level']
    fake_xml_contents = (1..4).map { |i| "<opendata><riskLevel#{i}>1</riskLevel#{i}></opendata>" }
    countries = create_list(:country, 4, risk_level: nil)
    allow(Country).to receive(:all).and_return(countries)
    allow(URI).to receive(:open).and_return(
      *fake_xml_contents.map { |content| StringIO.new(content) }
    )
    (1..4).each do |i|
      expect(countries[i-1].risk_level).to be nil
    end
    task.invoke
    (1..4).each do |i|
      expect(countries[i-1].risk_level).to be i
    end
  end
end
