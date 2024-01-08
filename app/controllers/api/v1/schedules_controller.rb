class Api::V1::SchedulesController < ApplicationController
  before_action :authenticate_user!, only:[:index, :create, :update, :destroy]


  def index
    user = current_user
    schedules = Schedule.where(user_id: user.id)
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

  def update
    schedule = Schedule.find(params[:id])
    if schedule.update(schedule_params)
      render json: {schedule: schedule}, status: 200
    else
      render json: {errors: schedule.errors.full_messages}, status: 400
    end
  end

  def destroy
    schedule = Schedule.find(params[:id])
    if schedule.destroy
      render json: {schedule: schedule}, status: 200
    else
      render json: {errors: schedule.errors.full_messages}, status: 400
    end
  end

  private
  def schedule_params
    params.require(:schedule).permit(:title, :description, :start_date, :end_date, :start_time, :end_time, :is_all_day, :color).merge(user_id: current_user.id)
  end
end