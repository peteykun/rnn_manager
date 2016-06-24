class RunsController < ApplicationController
  before_action :set_run, only: [:show, :edit, :update, :destroy]

  # GET /runs
  # GET /runs.json
  def index
    @runs = Run.all.order(id: :desc)
  end

  # GET /runs/1
  # GET /runs/1.json
  def show
  end

  # GET /runs/new
  def new
    @run = Run.new
  end

  # GET /runs/1/edit
  def edit
    # Don't allow accidental edits
    if not @run.editable
      redirect_to @run
      return
    end
  end

  # GET /runs/1/fork
  def fork
    run_to_fork = Run.find(params[:run_id])
    
    @run = run_to_fork.dup

    @run.resume_at = 0
    @run.resume_epoch = 0
    @run.resume_training_minibatch = 0
    @run.editable = true
    @run.output = ''

    render :new
  end

  # GET /runs/1/resume
  def resume_panel
    @run = Run.find(params[:run_id])
    @checkpoints = []

    @run.checkpoints.each do |checkpoint|
      @checkpoints << checkpoint[:step]
    end

    @checkpoints.reverse!

    render :resume
  end

  # POST /runs/1/resume
  def resume
    @run = Run.find(params[:run_id])
    @run.resume(params[:target], params[:username], params[:password], params[:checkpoint])
    redirect_to @run
  end

  # GET /runs/1/execute
  def execute_panel
    @run = Run.find(params[:run_id])
    render :execute
  end

  # POST /runs/1/execute
  def execute
    @run = Run.find(params[:run_id])
    @run.execute(params[:target], params[:username], params[:password])
    redirect_to @run
  end

  # POST /runs
  # POST /runs.json
  def create
    @run = Run.new(run_params)

    @run.resume_at = 0
    @run.resume_epoch = 0
    @run.resume_training_minibatch = 0
    @run.editable = true
    @run.output = ''

    respond_to do |format|
      if @run.save
        format.html { redirect_to @run, notice: 'Run was successfully created.' }
        format.json { render :show, status: :created, location: @run }
      else
        format.html { render :new }
        format.json { render json: @run.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /runs/1
  # PATCH/PUT /runs/1.json
  def update
    # Don't allow accidental edits
    if not @run.editable
      redirect_to @run
      return
    end

    respond_to do |format|
      if @run.update(run_params)
        format.html { redirect_to @run, notice: 'Run was successfully updated.' }
        format.json { render :show, status: :ok, location: @run }
      else
        format.html { render :edit }
        format.json { render json: @run.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /runs/1
  # DELETE /runs/1.json
  def destroy
    @run.destroy
    respond_to do |format|
      format.html { redirect_to runs_url, notice: 'Run was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_run
      @run = Run.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def run_params
      params.fetch(:run, {}).permit(:task_name, :batch_size, :embedding_dim, :memory_dim,
                                    :num_layers, :epochs, :rnn_cell, :ckpt_every,
                                    :correct_pairs, :mux_network, :output, :target)
    end
end
