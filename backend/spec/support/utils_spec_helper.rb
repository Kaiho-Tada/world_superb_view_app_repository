module UtilsSpecHelper
  def sort_by_id(array)
    array.sort_by { |item| item["id"] }
  end
end
