require "test_helper"

class Api::MetricsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_metrics_index_url
    assert_response :success
  end

  test "should get show" do
    get api_metrics_show_url
    assert_response :success
  end

  test "should get create" do
    get api_metrics_create_url
    assert_response :success
  end

  test "should get update" do
    get api_metrics_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_metrics_destroy_url
    assert_response :success
  end
end
