class Api::V1::SchedulesController < ApplicationController
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]
  before_action :set_schedule, only: [:update, :destroy]

  def index
    schedules = current_user.schedules
    render json: { schedules: schedules }
  end

  def create
    schedule = current_user.schedules.new(schedule_params)
    if schedule.save
      render json: { schedule: schedule }, status: 200
    else
      render json: { errors: schedule.errors.full_messages }, status: 400
    end
  end

  def update
    if @schedule.update(schedule_params)
      render json: { schedule: @schedule }, status: 200
    else
      render json: { errors: @schedule.errors.full_messages }, status: 400
    end
  end

  def destroy
    if @schedule.destroy
      render json: { schedule: @schedule }, status: 200
    else
      render json: { errors: @schedule.errors.full_messages }, status: 400
    end
  end

  private

  def set_schedule
    @schedule = current_user.schedules.find_by(id: params[:id])
    render json: { errors: ['Schedule not found'] }, status: :not_found unless @schedule
  end

  def schedule_params
    params.require(:schedule).permit(:title, :description, :start_date, :end_date, :start_time, :end_time, :is_all_day, :color)
  end
end
