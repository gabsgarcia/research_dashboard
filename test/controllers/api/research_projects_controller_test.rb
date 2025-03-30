require "test_helper"

class Api::ResearchProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_research_projects_index_url
    assert_response :success
  end

  test "should get show" do
    get api_research_projects_show_url
    assert_response :success
  end

  test "should get create" do
    get api_research_projects_create_url
    assert_response :success
  end

  test "should get update" do
    get api_research_projects_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_research_projects_destroy_url
    assert_response :success
  end

  test "should get favorites" do
    get api_research_projects_favorites_url
    assert_response :success
  end
end
