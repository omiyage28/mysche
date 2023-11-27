class Api::V1::SchedulesController < ApplicationController
  before_action :authenticate_user!, only:[:index, :create, :update, :destroy]


  def index
    user = current_user
    schedules = Schedule.all
    render json: {schedules: schedules}
  end

  def create
    schedule = Schedule.new(schedule_params)
    if schedule.save
      render json: {schedule: schedule}, status: 200
    else
      render json: {errors: schedule.errors.full_messages}, status: 400
    end
  end

  private
  def schedule_params
    params.require(:schedule).permit(:title, :description, :start_date, :end_date, :start_time, :end_time).merge(user_id: current_user.id)
  end
end