require "test_helper"

class Api::ExportsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_exports_create_url
    assert_response :success
  end
end
