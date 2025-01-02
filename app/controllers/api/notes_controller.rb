class Api::NotesController < ApplicationController
  # Ensures only logged-in users can work with notes
  before_action :authenticate_user!
  # Sets up the @note variable for update and destroy actions
  before_action :set_note, only: [:update, :destroy]

  def create
    # Creates a note associated with the current user
    note = current_user.notes.build(note_params)

    # Returns a JSON success response or validation errors
    if note.save
      render json: note
    else
      render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    # Update notes
    if @note.update(note_params)
      render json: @note
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    # Destroy a note
    @note.destroy
    render json: { message: "Note deleted successfully" }
  end

  private

  def set_note
    # Finds a note that belongs to the current user
    @note = current_user.notes.find(params[:id])

  # Handle cases where the note doesn't exist   #
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Note not found" }, status: :not_found
  end

  # Strong parameters to whitelist allowed fields
  def note_params
    params.require(:note).permit(:metric_id, :content)
  end
end
